Vue.directive('clickoutside',{
	bind: function(el,binding,vnode){
		function documentHandler(e){
			//第一个判断是判断点击的区域是否是指令所在的元素内部，如果是，就跳出函数，不往下继续执行
			if(el.contains(e.target)){
				return false;
			}
			//第二个判断的是目前的指令v-clickoutside有没有写运算式，在该自订指令中，运算式应该是一个函数，
			//在过滤了内部元素后，点击外面任何区域应该执行用户运式中的函数
			if(binding.expression){
				binding.value(e);//binding.value()是用来执行上下文methods中指定的函数的
			}
		}
		function keyUp(e){
			if(e.keyCode == 27){
				if(binding.expression){
					binding.value(e)
				}
			}
		}
		el._vueKeyup_ = keyUp;
		el._vueClickOutSide_= documentHandler;
		document.addEventListener('click',documentHandler);
		document.addEventListener('keyup',keyUp);
	},
	unbind: function(el,binding){
		document.removeEventListener('click',el._vueClickOutSide_);
		delete el._vueClickOutSide_;
		document.removeEventListener('keyup',el._vueKeyup_);
		delete el._vueKeyup_;
	}
});