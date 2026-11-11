# Deploying user-training-onboarding as a static website

`azure-pipelines.yml` (repo root) builds, tests, and deploys
`user-training-onboarding/` to an Azure Storage account's `$web` container on
every push to `main` that touches the app, `policies/registry.json`, or
`workflows/registry.json` (both rendered live into the app at build time —
see `src/domain/registry.ts`).

This repo is public; none of the pipeline's own deployment-target details
(storage account name, service connection name, Azure DevOps org/project)
are committed here. They live in Azure DevOps instead — a variable group and
a service connection, both set up once, as below.

## One-time setup

1. **A storage account with static website hosting enabled**, with **both**
   the index document and the 404 error document set to `index.html`. The
   404-document setting is required, not cosmetic: the app uses
   `react-router-dom`'s `BrowserRouter`, so a direct or refreshed link to a
   client-side route (e.g. `/policies/POL-3.1`) has no matching blob —
   without the fallback, Azure Storage would serve a bare 404 instead of the
   SPA shell that would otherwise resolve the route client-side.

   ```bash
   az storage blob service-properties update \
     --account-name <your-storage-account> \
     --static-website \
     --index-document index.html \
     --404-document index.html
   ```

2. **An Azure Resource Manager service connection**, in your Azure DevOps
   project (Project Settings → Service connections → New service
   connection → Azure Resource Manager), backed by a service principal
   granted **only** the `Storage Blob Data Contributor` role, **scoped to
   that one storage account** — not the resource group or subscription
   (POL-5.4: established auth framework; least privilege, not a blanket
   Contributor grant).

   Command-line equivalent, if you'd rather script it than use the UI
   (requires `Owner` or `User Access Administrator` on the storage account
   to create the role assignment):

   ```bash
   # 1. Create a service principal scoped to just this storage account
   az ad sp create-for-rbac \
     --name "<a name for this deploy identity>" \
     --role "Storage Blob Data Contributor" \
     --scopes "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Storage/storageAccounts/<your-storage-account>"

   # 2. Register it as an Azure DevOps service connection
   az devops service-endpoint azure-rm create \
     --organization "<your Azure DevOps org URL>" \
     --project "<your Azure DevOps project>" \
     --name "<a name for the service connection>" \
     --azure-rm-service-principal-id "<appId from step 1>" \
     --azure-rm-subscription-id "<subscription-id>" \
     --azure-rm-subscription-name "<subscription display name>" \
     --azure-rm-tenant-id "<tenant-id>"
   ```

3. **A variable group** named `user-training-onboarding-deploy` (Azure
   DevOps → Pipelines → Library → `+ Variable group`), with two plain
   (non-secret) variables:

   | Variable               | Value                                            |
   |------------------------|---------------------------------------------------|
   | `storageAccountName`   | the storage account's name                        |
   | `azureServiceConnection` | the service connection's name, from step 2      |

   Neither value is a secret (they're not credentials — the service
   connection holds the actual credential, separately), but keeping them in
   the variable group rather than the YAML means this public repo's history
   never names your specific storage account or Azure DevOps project. If
   your org's policy treats them as sensitive anyway, mark the variable
   group (or individual variables) secret in the Library UI — the pipeline
   doesn't care either way.

4. **The pipeline resource itself**, created once against this file:
   Azure DevOps → Pipelines → New pipeline → this repository → Existing
   Azure Pipelines YAML file → `/azure-pipelines.yml`. (Or via CLI:
   `az pipelines create --name user-training-onboarding --yml-path
   azure-pipelines.yml --skip-first-run`.) Grant the pipeline access to the
   variable group when first prompted (or Library → the group → Pipeline
   permissions).

## Why a clean (delete-then-upload) deploy

Vite content-hashes JS/CSS filenames per build, so an incremental
`upload-batch` alone would leave every previous build's now-unreferenced
chunks in `$web` forever. The pipeline deletes the container's contents
before uploading the new build. There's a brief window where `$web` is
empty mid-deploy; for this internal, low-traffic training site with no CDN
in front of it, that's an acceptable trade-off for not accumulating stale
assets indefinitely. Revisit (e.g. versioned prefixes behind a pointer
object, or a CDN with cache purge) if traffic or availability
expectations change.
