<script setup>
const props = defineProps({
	show: Boolean
})

</script>

<template>
	
	<Transition name="modal">
		<div v-if="show" class="modal-mask">
			<div class="modal-container">
				<div class="modal-header">
					<slot name="header"></slot>
				</div>
				<div class="modal-body">
					<slot name="body"></slot>
				</div>
				<button
				  class="modal-default-button"
				  @click="$emit('close')"
				>OK</button>
				<div class="modal-footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</Transition>
	
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

 /*#508845*/
.modal-container {
  width: 500px;
  margin: auto;
  padding: 30px 40px;
  background-color: #d8f8ff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*---------------------------------------*/

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}



</style>