<script setup>
    import { ref } from 'vue';
    import { authApi } from '../utils/authApi';

    const props = defineProps(["setUserData", "openSignin", "closePopupSignin", "setLoggedInTrue"])
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
        authApi.login(email.value, password.value)
            .then(res => {
            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.user))
            setUserData(res.user.email, res.user._id);
            props.setLoggedInTrue();
            props.closePopupSignin();
        }
        )
        .catch(err => console.log(err))
    }
</script>

<template>
    <section class='signin' v-bind:class="[openSignin ? 'visible' : '' ]" v-on:click.self="closePopupSignin" aria-label='Авторизация'>
      <div class="signin__wrapper">
        <div class="signin__greetin-wrapper">
            <h3 class='signin__greeting'>Рады видеть!</h3>
            <button type="button" class="signin__close" v-on:click="closePopupSignin"></button>
        </div>
        <form class='signin__form' name='signin-form'>
          <p class='signin__form-name'>E-mail</p>
          <input class='signin__email input' v-on:change="setEmail" type='email'/>
          <p class='signin__form-name'>Пароль</p>
          <input class='signin__password input' v-on:change="setPassword" type='password'/>
          <span class="signin__password-error">Длина пароля не менее 8 символов</span>
          <button class='signin__submit' type='submit' v-on:click="onSubmit">Войти</button>
        </form>
      </div>
    </section>

</template>

<style scoped>
    .signin__close {
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

    .signin__greetin-wrapper {
        display: flex;
        justify-content: space-between;
    }
    .signin__wrapper {
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

    .signin {
      z-index: 1;
      justify-content: center;
      align-items: center;
      position: absolute;
      display: none;
      width: 100%;
      height: 100%;
      background-color: #0000009f;
    }

    .signin__greeting {
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      margin: 24px 0 10px 20px;
    }

    .signin__form {
      margin: 18px 20px 0 20px;
    }

    .signin__form-name {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      margin: 21px 0 0;
      color: #A0A0A0;
    }

    .input {
      margin-top: 10px;
    }

    .signin__submit {
      border: none;
      background-color: black;
      color: white;
      width: 100%;
      height: 45px;
      border-radius: 3px;
      margin: 180px 0 18px 0;
    }

    .signin__submit:disabled{
      cursor: default;
      background-color: #A0A0A0;
    }

    .signin__submit:enabled {
      cursor: pointer;
      background-color: black;
    }

    .signin__notreg {
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