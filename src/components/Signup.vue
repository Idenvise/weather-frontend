<script setup>
    import { ref } from 'vue';
    import { authApi } from '../utils/authApi';

    const props = defineProps(["setUserData", "openSignup", "closePopupSignup", "setLoggedInTrue"])
    const {setUserData} = props;
    const email = ref('');
    const password = ref('');

    function setEmail(e) {
        email.value = e.target.value;
    }
    function setPassword(e) {
        password.value = e.target.value;
    }

    function onSubmit(e) {
      e.preventDefault();
      authApi.register(email.value, password.value)
        .then(() => {
          authApi.login(email.value, password.value)
            .then(res => {
              localStorage.setItem('token', res.token)
              localStorage.setItem('user', JSON.stringify(res.user))
              setUserData(res.user.email, res.user._id);
              props.setLoggedInTrue();
              props.closePopupSignup();
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
</script>

<template>
    <section class='signup' v-bind:class="[openSignup ? 'visible' : '' ]" v-on:click.self="closePopupSignup" aria-label='Авторизация'>
      <div class="signup__wrapper">
        <div class="signup__greetin-wrapper">
            <h3 class='signup__greeting'>Добро пожаловать!</h3>
            <button type="button" class="signup__close" v-on:click="closePopupSignup"></button>
        </div>
        <form class='signup__form' name='signup-form'>
          <p class='signup__form-name'>E-mail</p>
          <input class='signup__email input' v-on:change="setEmail" type='email'/>
          <p class='signup__form-name'>Пароль</p>
          <input class='signup__password input' v-on:change="setPassword" type='password'/>
          <span class="signup__password-error">Длина пароля не менее 8 символов</span>
          <button class='signup__submit' type='submit' v-on:click="onSubmit">Зарегистрироваться</button>
        </form>
      </div>
    </section>

</template>

<style scoped>
    .signup__close {
        border: none;
        background-color: transparent;
        background-image: url('../assets/cross.png');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        width: 20px;
        height: 20px;
        margin: 24px 20px 0 0;
        cursor: pointer;
    }

    .signup__greetin-wrapper {
        display: flex;
        justify-content: space-between;
    }
    .signup__wrapper {
        background-color: white;
        border-radius: 9px;
        width: 40%;
    }

    .input {
      border: none;
      height: 46px;
      background-color: #e4e4e4;
      border-radius: 8px;
      width: 100%;
      padding-left: 15px;
      margin-top: 10px;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      box-sizing: border-box;
      outline: none;
    }

    .input::placeholder {
      color: #A0A0A0;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
    }

    .signup {
      z-index: 1;
      justify-content: center;
      align-items: center;
      position: absolute;
      display: none;
      width: 100%;
      height: 100%;
      background-color: #0000009f;
    }

    .signup__greeting {
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      margin: 24px 0 10px 20px;
    }

    .signup__form {
      margin: 18px 20px 0 20px;
    }

    .signup__form-name {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      margin: 21px 0 0;
      color: #A0A0A0;
    }

    .input {
      margin-top: 10px;
    }

    .signup__submit {
      border: none;
      background-color: black;
      color: white;
      width: 100%;
      height: 45px;
      border-radius: 3px;
      margin: 180px 0 18px 0;
    }

    .signup__submit:disabled{
      cursor: default;
      background-color: #A0A0A0;
    }

    .signup__submit:enabled {
      cursor: pointer;
      background-color: black;
    }

    .signup__notreg {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #A0A0A0;
      text-align: center;
      margin-bottom: 20px;
    }

    .error {
      display: block;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: #FF4062;
      margin-top: 12px;
      visibility: hidden;
    }

    
    .visible {
      display: flex;
    }

</style>