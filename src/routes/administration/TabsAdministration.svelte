<script lang="ts">
  import { Plus } from "lucide-svelte";

  import TabContentAdministration from "./TabContentAdministration.svelte";
  import Dropzone from "$lib/components/ui/dropzone";
  import { Root, List, Trigger } from "$lib/components/ui/tabs/index";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<Root value="snapshots" class="py-4 w-full">
  <List class="grid grid-cols-3 w-[400px]">
    <Trigger value="users">Users</Trigger>
    <Trigger value="snapshots">Snapshots</Trigger>
    <Trigger value="secrets">Secrets</Trigger>
  </List>
  <TabContentAdministration
    tab={{
      value: "users",
      title: "Users Management",
      description:
        "Manage the users of the Keycloak / RH-SSO realm, retrieving and assigning them roles.",
    }}
  />
  <TabContentAdministration
    tab={{
      value: "snapshots",
      title: "Import Snapshots",
      description:
        "Upload and import a previously exported JSON repository snapshot.",
    }}
  >
    <Button slot="tabAction" variant={"outline"}>
      <Plus size={16} />
      Import
    </Button>
    <div slot="tabContent" class="w-full">
      <Dropzone />
    </div>
  </TabContentAdministration>
  <TabContentAdministration
    tab={{
      value: "secrets",
      title: "Authentication Secrets",
      description:
        "Manage the Authentication options available for different importers.",
    }}
  />
</Root>
