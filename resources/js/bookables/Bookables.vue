<template>
  <div>
    <div v-if="loading">Loading data...</div>
    <div v-else>
      <div
        class="row mb-4"
        v-for="row in rows"
        :key="'row' + row"
      >
        <div
          class="col"
          v-for="(bookable, column) in bookablesInRow(row)"
          :key="'row' + row + column"
        >
          <bookable-item
            :title="bookable.title"
            :content="bookable.content"
            :price="bookable.price"
          ></bookable-item>
        </div>

        <div
          class="col"
          v-for="p in placeholdersInRow(row)"
          :key="'placeholder' + row + p"
        ></div>
      </div>

    </div>
  </div>
</template>

<script>
import BookableListItem from "./BookableListItem";
export default {
  components: {
    bookableItem: BookableListItem
  },
  data() {
    return {
      bookables: null,
      loading: false,
      columns: 3
    };
  },
  methods: {
    bookablesInRow(row) {
      return this.bookables.slice((row - 1) * this.columns, row * this.columns);
    },
    placeholdersInRow(row) {
      return this.columns - this.bookablesInRow(row).length;
    }
  },
  computed: {
    rows() {
      return this.bookables === null
        ? 0
        : Math.ceil(this.bookables.length / this.columns);
    }
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.bookables = [
        {
          id: 1,
          title: "Continental Villas",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, tempore!",
          price: 50000
        },
        {
          id: 2,
          title: "Galaxy Villas",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, tempore!",
          price: 50000
        },
        {
          id: 3,
          title: "Pristine Villas",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, tempore!",
          price: 50000
        },
        {
          id: 4,
          title: "First Class Villas",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, tempore!",
          price: 50000
        },
        {
          id: 5,
          title: "Premium Villas",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, tempore!",
          price: 50000
        }
      ];
      this.loading = false;
    }, 1000);
  }
};
</script>