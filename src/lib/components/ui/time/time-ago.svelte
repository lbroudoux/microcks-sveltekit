<script lang="ts">
  interface Props {
    ts: number;
  }

  let { ts }: Props = $props();

  const format = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  function formatDateTime() {
    const now = new Date();
    const date = new Date(ts);

    const seconds = Math.round(
      Math.abs((now.getTime() - date.getTime()) / 1000),
    );
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));

    if (Number.isNaN(seconds)) {
      return "";
    } else if (seconds <= 45) {
      return "a few seconds ago";
    } else if (seconds <= 90) {
      return "a minute ago";
    } else if (minutes <= 45) {
      return minutes + " minutes ago";
    } else if (minutes <= 90) {
      return "an hour ago";
    } else if (hours <= 22) {
      return hours + " hours ago";
    } else if (hours <= 36) {
      return "a day ago";
    } else if (days <= 25) {
      return days + " days ago";
    } else if (days <= 45) {
      return "a month ago";
    } else if (days <= 345) {
      return months + " months ago";
    } else if (days <= 545) {
      return "a year ago";
    } else {
      // (days > 545)
      return years + " years ago";
    }
  }
</script>

{formatDateTime()}
