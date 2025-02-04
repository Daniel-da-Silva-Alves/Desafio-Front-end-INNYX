<!-- Esta diretiva é um espaço reservado onde os componentes correspondentes às rotas definidas serão renderizados. Em outras palavras, quando a rota da aplicação muda, o componente associado a essa rota será exibido dentro do <router-view>. Isso é essencial para a navegação em aplicações Vue que utilizam o Vue Router para gerenciar as rotas. -->
<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa os ícones do Bootstrap
</script>