<template>
  <v-form @submit.prevent fluid style="height: 99.9vh; display: flex; align-items: center;">
    <v-container>
      <v-row justify="center">
        <h1>
          LeadHit
        </h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-text-field v-model="siteid" :rules="siteIdRules" label="Site ID"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn type="submit" variant="outlined" @click="checkSiteId()">
          Войти
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { router } from '@/router'
export default {
  name: 'AuthorizeComponent',
  data: () => ({
    valid: false,
    siteid: '',
    siteIdRules: [],
  }),
  watch: {
    'siteid'() {
      this.siteIdRules = []
    }
  },
  methods: {
    checkSiteId() {
      this.siteIdRules = [
        async (v) => {
          if (v.length === 24) {
            try {
              const response = await fetch('https://track-api.leadhit.io/client/test_auth', {
                method: 'GET',
                headers: {
                  "Api-Key": this.$store.state.apiKey,
                  "Leadhit-Site-Id": v
                },
              });
              if (response.ok) {
                localStorage.setItem('leadhit-site-id', v);
                router.push({ name: 'analytics' });
              }
              return true;
            } catch (e) {
              return 'Произошла ошибка при проверке SiteID'
            }
          } else {
            return 'id сайта должен содержать 24 символа'
          }
        }
      ]
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
