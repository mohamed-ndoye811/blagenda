import colors from 'tailwindcss/colors';
<script setup lang="ts">
const { id, label, name, value, placeholder, required, disabled, type = "button" } = defineProps(
  {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
      validator: (value: string) => ["button", "submit", "reset"].includes(value),
    },
  }
);
</script>

<template>
  <button
    :id="id"
    class="form-input"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    :required="required"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<style lang="scss">
button {
    all: unset;
    border-radius: 5px;
    padding: 16px 40px;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
    display: grid;
    place-content: center;
    color: $clr-primary;
    background-color: $clr-secondary;
}
</style>