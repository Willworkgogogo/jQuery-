/**
 * 注释一下剥茧抽丝后，框架的骨架部分
 */

// 立即执行函数，接受一个window参数，保证了window环境
// 这个undefined使用的巧妙，利用自身生成一个真正的undefined类型，防止意外
// Jquery的所有的内容都在这个自执行函数里
(function (window, undefined) {

  // 定义一个jQuery变量，指向后面函数返回的jQuery对象。这么做也就是简单的封装。
  var jQuery = (function () {

    var jQuery = function () {
      // 先忽略参数
      // jQuery.fn = jQuery.prototype ，这个jQuery.fn 只是简单的对jQuery原型的引用
      // 这里实现了调用jQuery函数，便能实例化它，其实就是通过实例化jQuery构造函数原型上的方法，关键点在于将该方法的prototype对象改写为jQuery的原型对象
      return new jQuery.fn.init()
    }

    jQuery.fn = jQuery.prototype = {
      constructor: jQuery,
      init: function (selector, context, rootjQuery) {
        // selector有以下7种分支情况：
        // DOM元素
        // body（优化）
        // 字符串：HTML标签、HTML字符串、#id、选择器表达式
        // 函数（作为ready回调函数）
        // 最后返回伪数组
      },
      jquery: "1.7.0"
    }

    // 关键一步
    jQuery.fn.init.prototype = jQuery.fn


    /**
     * jQuery.extend() 和 jQuery.fn.extend() 方法
     * 这两个方法指向同一个函数，利用函数内部this指向对象不同，一个为jQuery对象扩展方法，一个为jQuery.fn也就是jQuery.prototype原型对象扩展方法。其他的功能是一致的
     * 功能：
     *  1. 对象合并 ， 深拷贝 $.extend(true, {}, {name: 'will', age: 12, job: 'fe'})
     *  2. jQuery.extend({age: 18}) 传的是单个对象，将会被挂载到jQuery对象上，$.age就能访问到。 jQuery.fn.extend({age: 18}), 挂载到jQuery对象的原型上，$().age访问
     */
    jQuery.extend = jQuery.fn.extend = function () {
      var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},  // target用于代表当前处理的参数
        i = 1,
        length = arguments.length,
        deep = false;

      // Handle a deep copy situation // 第一个参数是否是布尔值，来决定是否进行深浅拷贝
      if (typeof target === "boolean") { // jQuery.extend(true, {name: 'WILL'})
        deep = target; // 拿到第一个参数的值 true or false
        target = arguments[1] || {}; // 修改target的值，将target设置为第二个参数或者为空对象
        // skip the boolean and the target
        i = 2; // i就是参数的起始位置。 修改i的值，跳过参数的第1、2项，因为后面要遍历参数
      }

      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== "object" && !jQuery.isFunction(target)) { // target非对象、非函数情况
        target = {};
      }

      // extend jQuery itself if only one argument is passed
      // 传递一个参数的情况，就是去扩展jQuery对象本身
      // 用于实现插件
      // jQuery.extend(true, {name: 'Will'}) 这种情况也能通过判定啊？ 因为第一个判断修改了i=2，这里length==2， 所以length==i ? 尴尬，怎么理解
      if (length === i) {
        target = this;
        --i;
      }

      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
          // Extend the base object
          for (name in options) {
            src = target[name];
            copy = options[name];

            // Prevent never-ending loop // 设定条件，避免死循环
            if (target === copy) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              // 以下内容都用于深度拷贝
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : []; // 判断src是否为数组，是赋值给clone，不是则将[]赋值给clone

              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }

              // Never move original objects, clone them
              // 递归
              target[name] = jQuery.extend(deep, clone, copy);

              // Don't bring in undefined values
            } else if (copy !== undefined) {
              // 往target对象上添加属性值
              target[name] = copy;
            }
          }
        }
      }

      // Return the modified object
      // 将修改后的目标对象返回
      return target;
    }

    return jQuery
  })()

})(window)