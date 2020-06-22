<template>
  <div class="fe-auth">
    <v-menu
      v-if="loggedIn"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          text
          class=""
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar
            size="26px"
            class="fe-post-avatar"
          >
            <img
              v-if="userAvatar"
              alt="Avatar"
              :src="userAvatar"
            >
            <v-icon
              v-else
              color="#A0A0A0"
            >mdi-account-circle</v-icon>
          </v-avatar>
          <span class="fe-avatar-label">
            {{username}}
          </span>
        </v-btn>
      </template>

      <v-list>
        <v-list-item link>
          <v-list-item-title>profile</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="logoutUser"
          link>
          <v-list-item-title>logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      v-else
      outlined
      small
      color='#EE0200'
      @click.stop='loginDialog=true'
    >
      Login
    </v-btn>
    <v-dialog
      v-model="loginDialog"
      max-width="450"
    >
      <v-card>
        <v-card-title class="headline">Login</v-card-title>

        <v-card-text>
          Please enter your username and password below.
        </v-card-text>
        <v-card-text>
          <v-text-field
            label="Username or E-Mail"
            v-model='email'
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPass ? 'text' : 'password'"
            label="Password"
            counter
            @click:append="showPass = !showPass"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            x-small
            color='blue'
            @click="showRegister"
          >
            register
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="loginDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color='blue darken-1'
            text
            primary
            @click="login"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="registerDialog"
      max-width="450"
    >
      <v-card>
        <v-card-title class="headline">Register</v-card-title>

        <v-card-text>
          Please enter your details below.
        </v-card-text>
        <v-card-text>
          <v-text-field
            label="E-Mail"
            v-model='regEmail'
          ></v-text-field>
          <v-text-field
            label="Username"
            v-model='regUsername'
          ></v-text-field>
          <v-text-field
            v-model="regPassword"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPass ? 'text' : 'password'"
            label="Password"
            counter
            @click:append="showPass = !showPass"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPass ? 'text' : 'password'"
            label="Confirm Password"
            counter
            @click:append="showPass = !showPass"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="registerDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color='blue'
            text
            primary
            @click="register"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
// import strapi from '@/utils/Strapi';
import { LOGIN, GET_USER, REGISTER } from '@/assets/serviceApi/queries.js';

export default {
  name: 'FE-Auth',
  data() {
    return {
      email: '',
      regEmail: '',
      password: '',
      regPassword: '',
      confirmPassword: '',
      regUsername: '',
      loading: false,
      loginDialog: false,
      registerDialog: false,
      showPass: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email/user and password you entered don\'t match'),
      },
    };
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    userAvatar() {
      return this.$store.getters.userAvatar;
    },
    loggedIn() {
      if (this.$store.getters.username) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async getUserData(data) {
      this.$apollo.query({
        query: GET_USER,
        variables: { id: data.user.id },
      })
        .then((response) => {
          const tmpUser = {};
          tmpUser.user = {
            ...data.user,
            ...response.data.user,
          };
          tmpUser.jwt = data.jwt;
          localStorage.setItem('jwt', data.jwt);
          this.clearDialogs();
          this.setUser(tmpUser);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async login() {
      try {
        this.loading = true;
        this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            identifier: this.email, password: this.password,
          },
          update: (proxy, { data }) => {
            localStorage.setItem('jwt', data.login.jwt);
            this.getUserData(data.login);
          },
        });
      } catch (err) {
        this.loading = false;
        // eslint-disable-next-line no-alert
        alert(err.message || 'An error occurred.');
      }
    },
    showRegister() {
      this.loginDialog = false;
      this.registerDialog = true;
    },
    clearDialogs() {
      this.email = '';
      this.password = '';
      this.loginDialog = false;
      this.loading = false;
      this.regUsername = '';
      this.regPassword = '';
      this.regEmail = '';
      this.confirmPassword = '';
      this.registerDialog = false;
    },
    async register() {
      try {
        this.loading = true;
        this.$apollo.mutate({
          mutation: REGISTER,
          variables: {
            username: this.regUsername, email: this.regEmail, password: this.regPassword,
          },
          update: (proxy, { data }) => {
            localStorage.setItem('jwt', data.register.jwt);
            this.getUserData(data.register);
          },
        });
      } catch (err) {
        this.loading = false;
        // eslint-disable-next-line no-alert
        alert(err.message || 'An error occurred.');
      }
    },
    async logoutUser() {
      this.logout();
    },
    ...mapMutations({
      setUser: 'setUser',
      logout: 'logout',
    }),
  },
};
</script>

<style lang="scss" scoped>

.fe-post-avatar {
  margin-right: 5px;
}

.fe-login-btn {
  max-width: .2vw;
}

@media (max-width:550px) {
  .fe-avatar-label {
    font-size: .6rem;
  }
}

@media (max-width:400px) {
  .fe-avatar-label {
    display: none;
  }

  .fe-post-avatar {
    margin-right: -4px;
  }
}
</style>
