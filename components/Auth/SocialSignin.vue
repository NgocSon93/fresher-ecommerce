<template>
  <div class="social-signin">
    <p class="text-center">
      Sign in with social account
    </p>
    <div class="social-icons w-full justify-center">
      <NuxtLink to="" class="social-icon social-facebook">
        <Icon name="jam:facebook" class="custom-icon" />
      </NuxtLink>
      <NuxtLink to="" class="social-icon social-twitter">
        <Icon name="jam:twitter" class="custom-icon" />
      </NuxtLink>
      <NuxtLink to="" class="social-icon social-google">
        <Icon name="jam:google" class="custom-icon" />
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.social-signin {
  & p {
    @apply text-[1.4rem] font-normal leading-[1.86] mb-[1.9rem];
  }

  & .social-icons {
    @apply inline-flex flex-wrap items-center;

    & .social-icon {
      @apply flex items-center justify-center w-[32px] h-[32px] border-[1px] border-solid border-[#cdcdcd] rounded-full cursor-pointer;
      @apply text-secondary-500 text-[1.4rem] leading-[3rem] text-center transition-colors duration-[400ms] my-[2px] mr-[0.8rem] ml-0;

      & .custom-icon {
        @apply text-[1.8rem];
      }

      &.social-facebook {
        @apply text-[#1b4f9b] border-[#1b4f9b];
      }

      &.social-twitter {
        @apply text-[#00adef] border-[#00adef];
      }

      &.social-google {
        @apply text-[#dd4b39] border-[#dd4b39];
      }

      &:hover {
        @apply text-[#fff];

        &.social-facebook {
          @apply bg-[#1b4f9b] border-[#1b4f9b];
        }

        &.social-twitter {
          @apply bg-[#00adef] border-[#00adef];
        }

        &.social-google {
          @apply bg-[#dd4b39] border-[#dd4b39];
        }
      }
    }
  }
}
</style>
