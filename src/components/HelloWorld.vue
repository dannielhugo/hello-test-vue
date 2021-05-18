<template>
  <div class="hello">
    <ul>
      <li v-for="link in links" :key="link.text">
        <a :href="link.href" target="_blank" rel="noopener">{{link.text}}</a>
      </li>
    </ul>

    <button @click="fetchStarships">FETCH STARSHIPS</button>

    <ul v-if="starships.length > 0" class="starships">
      <li v-for="starship in starships" :key="starship.name">
        <p>Model: {{starship.model}}</p>
        <p>Name: {{starship.name}}</p>
        <p>Credits: {{starship.cost_in_credits}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    // SNAPSHOT TEST
    // showAwesomeVue: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  data() {
    return {
      links: [
        {href: 'https://router.vuejs.org', text: 'vue-router'},
        {href: 'https://vuex.vuejs.org', text: 'vuex'},
        {href: 'https://github.com/vuejs/vue-devtools#vue-devtools', text: 'vue-devtools'},
        {href: 'https://vue-loader.vuejs.org', text: 'vue-loader'},
      ],
      starships: []
    };
  },
  async mounted() {
    // SNAPSHOT TEST
    // if (this.showAwesomeVue) {
    //   this.links.push(
    //     {href: 'https://github.com/vuejs/awesome-vue', text: 'awesome-vue'},
    //   );
    // }
  },
  methods: {
    async fetchStarships() {
      const response = await axios.get('https://swapi.dev/api/starships/');
      this.starships = response.data.results;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.starships {
  display: flex;
  flex-direction: column;
}

.starships li {
  border: 2px solid #f1f1f1;
  border-radius: 1.5rem;
  margin-top: 1rem;
}
</style>
