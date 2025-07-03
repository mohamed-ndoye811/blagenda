<script lang="ts" setup>
const { id, name, placeholder, required, disabled, label, type } = defineProps({
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
    default: "text",
    validator: (value: string) =>
      ["text", "email", "password"].includes(value),
  },
});

// Utilisation de defineModel pour une liaison bidirectionnelle avec v-model
const modelValue = defineModel<string>({
  default: "",
});
</script>

<template>
  <div class="form-input-container">
    <label v-if="label" :for="name" class="form-label">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="modelValue"
      class="form-input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
    >
  </div>
</template>

<style lang="scss">
.form-input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  position: relative;

  input {
    all: unset;
    border: 2px solid $clr-secondary;
    border-radius: 8px;
    padding: 16px 20px;
    width: 100%;
    box-sizing: border-box;

    &::placeholder {
      color: $clr-secondary;
      opacity: 0.5;
    }

    &:-internal-autofill-selected {
      background-color: $clr-primary !important;
    }
  }

  label {
    font-size: 1rem;
    color: $clr-secondary;
    margin-bottom: 0.5rem;
    background-color: $clr-primary;
    position: absolute;
    top: 0;
    left: 20px;
    translate: 0 -50%;
    padding: 0 8px;
  }
}
</style>
