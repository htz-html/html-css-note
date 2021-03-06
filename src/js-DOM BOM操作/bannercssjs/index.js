window.addEventListener("load", function(){
	//-----------
	//-----------1.先给左右箭头按钮效果
	//-----------
	var banner = document.querySelector(".banner");
	var arrow_l = document.querySelector(".arrow_l");
	var arrow_r = document.querySelector(".arrow_r");
	var imgwidth = banner.offsetWidth;// 图片的宽度
	banner.addEventListener("mouseenter", function(){
		arrow_l.style.display = "block";
		arrow_r.style.display = "block";
		clearInterval(timer);
		timer = null;
	});
	banner.addEventListener("mouseleave", function(){
		arrow_l.style.display = "none";
		arrow_r.style.display = "none";
		timer = setInterval(function(){
			// 手动调用点击事件
			arrow_r.click();
		},1000)
	});
	var num = 0;
	var circle = 0;
	arrow_r.addEventListener("click",function(){
		if(num === ul.children.length-1) {
			ul.style.left = 0;
			num = 0;
		}
		num++;
		animate(ul, -num*imgwidth);	
		//这里为什么不直接用num,因为在if判断的时候,需要的条件不一样;
		circle++;
		if(circle === ol.children.length) {
			circle = 0;
		}
		Current();
	});
	
	//------------
	//------------2.向左箭头
	//------------
	arrow_l.addEventListener("click", function(){
		if(num === 0) {
			num = ul.children.length -1;
			ul.style.left = -num*imgwidth + "px";
		}
		num--;
		animate(ul, -num*imgwidth);	
		//这里为什么不直接用num,因为在if判断的时候,需要的条件不一样;
		circle--;
		// if(circle < 0) {
		// 	circle = ol.children.length-1;
		// }
		// 改成一个三元表达式
		circle = circle < 0?ol.children.length-1: circle;
		Current();
		
	});
	//点击左右按钮时,下面的小圆点跟着一起动的函数
	function Current(){
		for(var i=0;i<ol.children.length; i++){
			ol.children[i].className = "";
		}
		ol.children[circle].className = "current";
	}
	
	
	//------------
	//------------3.给小圆圈添加效果
	//------------
	//根据上面的轮播图的个数,动态的获取小圆点的个数
	var ul = banner.querySelector("ul");
	var ol = document.querySelector(".circle");
	//创建ol中的li,就要拿到ul里面li的个数,再循环创建节点>插入节点
	for(var i = 0; i<ul.children.length;i++){
		var li = document.createElement("li");
		li.setAttribute("index", i);
		ol.appendChild(li);
		li.addEventListener("click", function(){
			for(var i = 0; i < ol.children.length; i++) {
				ol.children[i].className = "";
			}
			this.className = "current";
			var index = this.getAttribute("index"); // 得到图片li里面的index的值,索引号
			num = index;
			circle = index;
			animate(ul, -imgwidth*index);
		});
	}
	ol.children[0].className = "current";
	// 克隆第一张图,插入到最后
	// 增加了一个li图片,但是小圆圈没有增加,是因为我们把克隆的代码放在了生成小圆圈for循环的后面
	var first = ul.children[0].cloneNode(true);
	ul.appendChild(first);
	
	//------------
	//------------4.自动轮播
	//------------
	
	var timer = setInterval(function(){
		// 手动调用点击事件
		arrow_r.click();
	},1000)
})