<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import PageLayout from "@/components/layouts/PageLayout.svelte";
  import { Button } from "@/components/ui/button";
  import * as Card from "@/components/ui/card/index.js";

  export let data: PageData;

  onMount(() => {
    console.log("In page onMount()");
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<PageLayout>
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
</P>

<style>
</style>
