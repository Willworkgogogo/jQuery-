/**
 * 不直接new jQuery构造函数本身，来创建原型链
 * 间接的实例化jQuery构造函数原型上的某个方法
 * 但这里需要注意一点，需要将该方法的原型指向jQuery的原型对象
 */ 
var jQuery = function () {
  return new jQuery.prototype.init()
}

jQuery.prototype = {
  constructor: jQuery,
  jquery: 1.0,
  init: function() {
    this.jquery = 2.0
    return this
  },
  each:  function() {
    console.log('each')
    return this
  }
}

// 将init的原型指向jQuery.prototype
jQuery.prototype.init.prototype = jQuery.prototype

// console.log(jQuery().each().init().constructor)



/**
 * jQuery.fn 指向了jQuery构造函数的原型对象
 */
jQuery.fn = jQuery.prototype

// 将jQuery构造函数通过别名挂载到window全局对象上
window.jQuery = window.$ = jQuery

// 