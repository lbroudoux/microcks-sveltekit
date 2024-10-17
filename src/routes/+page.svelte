<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import { onMount } from 'svelte';

  export let data: PageData;

  onMount(() => {
    console.log("In page onMount()");
  })
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div>
    <Button>Click me</Button>
  </div>

  <div class="flex flex-row gap-4">
    <div>
      <Card.Root>
        <Card.Header>
          <Card.Title tag="h1">Card Title</Card.Title>
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
          <Card.Title tag="h1">Card Title</Card.Title>
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
          <Card.Title tag="h1">Card Title</Card.Title>
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
          <Card.Title tag="h1">Card Title</Card.Title>
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
          <Card.Title tag="h1">Card Title</Card.Title>
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
          <Card.Title tag="h1">Card Title</Card.Title>
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
</section>

<style>

</style>
