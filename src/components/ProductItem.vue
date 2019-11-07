<template>
  <details :open="isOpen">
    <summary>{{ product.name }}</summary>
    <div>
      <button type="button">Добавить в корзину</button>
    </div>
  </details>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
