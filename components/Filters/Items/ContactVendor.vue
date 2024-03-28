<script setup lang="ts">
</script>

<template>
  <div class="widget-contact">
    <input id="name" type="text" class="form-control" name="name" placeholder="Your Name">
    <input id="email_1" type="text" class="form-control" name="email" placeholder="you@example.com">
    <textarea
      name="message" maxlength="1000" cols="25" rows="6" placeholder="Type your messsage..." class="form-control"
      required
    />
    <button href="#" class="btn btn-dark btn-rounded">
      Send Message
    </button>
  </div>
</template>

<style scoped lang="scss">
.widget-contact {
  padding-top: 1.3rem;
  padding-bottom: 1rem;

  & input {
    min-height: 4.4rem;
    padding-top: 0.9rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  & textarea {
    min-height: 17.4rem;
    padding-top: 1.1rem;
    padding-bottom: 1.1rem;
    margin-bottom: 2rem;
  }

  & .form-control {
    display: block;
    width: 100%;
    min-height: 4.7rem;
    padding: 0.85rem 2rem;
    border: 1px solid #eee;
    font-size: 1.4rem;
    font-family: Poppins, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: #999;
    background-color: transparent;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: 0;
  }

  & .form-control {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-size: 1.3rem;
    border-color: #e1e1e1;
    border-radius: 0.3rem;
  }

  & .btn {
    display: inline-block;
    border: 2px solid #ccc;
    background-color: #fff;
    color: #666;
    outline: 0;
    border-radius: 0;
    font-family: inherit;
    font-weight: 600;
    font-size: 1.4rem;
    padding: 0.93em 1.98em;
    line-height: 1;
    text-transform: uppercase;
    text-align: center;
    -webkit-transition: color 0.3s, border-color 0.3s, background-color 0.3s, -webkit-box-shadow 0.3s;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s, -webkit-box-shadow 0.3s;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s, -webkit-box-shadow 0.3s;
    white-space: nowrap;
    cursor: pointer;
  }

  & .btn-dark {
    color: #fff;
    border-color: #333;
    background-color: #333;

    &:hover,
    :active,
    :focus {
      color: #fff;
      border-color: #454545;
      background-color: #454545;
    }
  }

  & .btn.btn-rounded {
    border-radius: 3px;
  }
}
</style>
