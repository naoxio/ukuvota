<template>

      <center>
        <br/>
        <q-alert color="light">{{ $t('Disclaimer') }}</q-alert>
        <br/>
        <router-link :to="{ name: 'create' }">
          <UBtn>{{ $t('StartWebApp') }}</UBtn>
        </router-link>
      </center>
    </div>
  </main-layout>
</template>
