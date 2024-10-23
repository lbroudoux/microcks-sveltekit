<script lang="ts">
  import TabContentAdministration from "$lib/components/administration/TabContentAdministration.svelte";
  import { Root, List, Trigger, Content } from "$lib/components/ui/tabs/index";
</script>

<Root value="users" class="py-4 w-full">
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
  />
  <TabContentAdministration
    tab={{
      value: "secrets",
      title: "Authentication Secrets",
      description:
        "Manage the Authentication options available for different importers.",
    }}
  />
</Root>
