
<script>
import { t } from "i18next";

export default {
  props: {
    dates: {
      type: Array,
      required: true
    },
    tillStart: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      timeUnits: [
        { id: "days", label: t("time.days") },
        { id: "hours", label: t("time.hours") },
        { id: "minutes", label: t("time.minutes") },
        { id: "seconds", label: t("time.seconds") }
      ],
      classList: "",
      time: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    };
  },
  mounted() {
    switch (this.type) {
      case "warning":
        this.classList = "link-warning";
        break;
      case "success":
        this.classList = "link-success";
        break;
    }
    this.countdown();
  },
  methods: {
    countdown() {
      if (this.tillStart && this.dates[0] < +new Date() + 1000) {
        this.hide();
        return;
      }
      let time = this.tillStart
        ? (+new Date() - this.dates[0]) / 1000
        : this.dates[0] < +new Date()
        ? (this.dates[1] - +new Date()) / 1000
        : (this.dates[1] - this.dates[0]) / 1000;
      if (!this.tillStart && time <= 1) {
        this.hide();
        return;
      }
      time = Math.abs(time);
      let seconds = time % 60;
      time = (time - seconds) / 60;
      let minutes = time % 60;
      time = (time - minutes) / 60;
      let hours = time % 24;
      time = (time - hours) / 24;
      let days = time;
      // round numbers

      this.time.days = Math.floor(days);
      this.time.hours = Math.floor(hours);
      this.time.minutes = Math.floor(minutes);
      this.time.seconds = Math.floor(seconds);

      if (this.tillStart || this.dates[0] < +new Date()) setTimeout(this.countdown, 1000);
    },
    hide() {
      this.time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
  }
};
</script>
<template>
    <div :class="classList">
      <span v-for="timeUnit in timeUnits" :id="timeUnit.id" class="hidden">
        <span>{{ time[timeUnit.id] }}</span>
        {{ timeUnit.label }}&nbsp;
      </span>
    </div>
  </template>