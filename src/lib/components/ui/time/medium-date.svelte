<script lang="ts">
  interface Props {
    ts: number;
  }

  let { ts }: Props = $props();

  const format = new Intl.DateTimeFormat('en-us', {
    dateStyle: 'medium',
    timeStyle: 'medium'
  });

  function formatDateTime() {
    const date = new Date(ts);
    return format.format(date);
  }
</script>

{formatDateTime()}

