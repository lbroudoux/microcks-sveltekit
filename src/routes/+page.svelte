<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import PageLayout from "$lib/components/layouts/PageLayout.svelte";
  import * as Card from "$lib/components/ui/card/index.js";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let servicesCount: number = $state();
  let repositoryDonutChartData: any = [
    ['REST', 0],
    ['DIRECT', 0],
    ['SOAP', 0],
    ['EVENT', 0],
    ['GRPC', 0],
    ['GRAPH', 0],
  ];

  onMount(() => {
    console.log("In page / onMount()");

    data.servicesMap.then((results) => {
      servicesCount = Object.keys(results).length;
      let directCount = 0;
      for (const key in results) {
        if (key === 'GENERIC_REST' || key === 'GENERIC_EVENT') {
          directCount += results[key];
          repositoryDonutChartData.push(['DIRECT', directCount]);
        } else if (key === 'SOAP_HTTP') {
          repositoryDonutChartData.push(['SOAP', results[key]]);
        } else if (key === 'GRAPHQL') {
          repositoryDonutChartData.push(['GRAPH', results[key]]);
        } else {
          repositoryDonutChartData.push([key, results[key]]);
        }
      }
    });

    function isRepositoryPanelDisplayed(): boolean {
      return servicesCount > 1;
    }
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<PageLayout>
  <div class="flex flex-row gap-4">
    <div>
      <Card.Root>
        <Card.Header>
          <Card.Title tag="h1">APIs | Services Repository</Card.Title>
          <Card.Description>Card Description</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>{servicesCount} API & Services</p>
        </Card.Content>
        <Card.Footer>
          <p>Card Footer</p>
        </Card.Footer>
      </Card.Root>
    </div>
    <div>
      <Card.Root>
        <Card.Header>
          <Card.Title tag="h1">Most Used APIs | Services</Card.Title>
          <Card.Description>Card Description</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Card Content</p>
        </Card.Content>
        <Card.Footer>
          <p>Card Footer</p>
        </Card.Footer>
      </Card.Root>
    </div>
    <div>
      <Card.Root>
        <Card.Header>
          <Card.Title tag="h1">APIs | Services Mocks Invocations</Card.Title>
          <Card.Description>Card Description</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Card Content</p>
        </Card.Content>
        <Card.Footer>
          <p>Card Footer</p>
        </Card.Footer>
      </Card.Root>
    </div>
  </div>

  <div class="grid grid-cols-8 gap-8">
    <div>
      <Card.Root>
        <Card.Header>
          <Card.Title tag="h1">API | Services Conformance Risks</Card.Title>
          <Card.Description>Card Description</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Card Content</p>
        </Card.Content>
        <Card.Footer>
          <p>Card Footer</p>
        </Card.Footer>
      </Card.Root>
    </div>
    <div>
      <Card.Root>
        <Card.Header>
          <Card.Title tag="h1">API | Services Tests</Card.Title>
          <Card.Description>Card Description</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Card Content</p>
        </Card.Content>
        <Card.Footer>
          <p>Card Footer</p>
        </Card.Footer>
      </Card.Root>
    </div>
  </div>
</PageLayout>
