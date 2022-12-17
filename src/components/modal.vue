<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              	<button class="modal-default-button">
                OK
              	</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  methods:{
  	closeModal() {
  		this.$parent.closeModal()
  	}
  },
  created() {
  	// console.info(this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 30px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  padding: 10px;
  color: #000;
  font-weight: normal;
  border-bottom: 2px solid #000;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-default-button {
	font-size: 22px;
    bottom: 20px;
    float: unset;
    text-align: center;
    border: 0;
    font-weight: bold;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-input {
  height: 30px;
  font-size: 24px;
  width: 84%;
  padding: 20px;
  text-align: right;
  border: 4px solid #000;
  background: #fff;
  margin:0;
}
.modal-input:focus {
  outline:0;
}
.modal-button {
    width: auto;
    padding: 10px;
    margin: 10px;
    border: 4px solid #000;
    background: #000;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
}
.modal-button:hover {
  background: #fff;
  color: #000;
}
</style>
