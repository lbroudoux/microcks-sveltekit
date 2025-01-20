<script lang="ts">
  import ApiTag from '$lib/components/ui/api-tag/api-tag.svelte';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import SectionHeading from "$lib/components/layouts/SectionHeading.svelte";
  import { MediumDate, TimeAgo } from "$lib/components/ui/time";

  import type { Service } from "$lib/models/service.model";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let service: Service = $state(data.service);

  onMount(() => {
    console.log("In page /services/[id] onMount()");
  })
</script>

<PageLayout>
  
  <h1>Service {service.name} - {service.version}</h1>
  <small>Created <TimeAgo ts={service.metadata.createdOn}/>, last update on <MediumDate ts={service.metadata.lastUpdate}/></small>

  <h3>Properties</h3>
  <dl>
    <dt>Service Type:</dt>
    <dd><ApiTag type="{service.type}"/></dd>
  </dl>

  <div>
    <a href="/tests/service/{service.id}">View Tests Runs</a>
  </div>
</PageLayout>

<style>

</style>