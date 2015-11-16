define(function (Zepto) {
    function divselect(dom,args){
    var ds_contTpl = "<div class='ds_cont'><div class='ds_title'></div><div class='ds_button'></div></div>";    
    
    var ds_listTpl = "<div class='ds_list' style='display: none;'><div class='dsl_cont'></div></div>";
        
        
        
     var _init=divselect.prototype._init = function(){
          this.dom = dom;
          this._create(args);
          this._bindEvent();
      } 
       _init.prototype = divselect.prototype;
       
       _init.prototype._create = function(args){
            this.divOutter= document.createElement('div');
            this.divOutter.className = args.outterClass || '';
            this.dom.parentNode.style.position="relative";
            this.divOutter.style.position='absolute';
            
            this.divOutter.style.left =  this.dom.offsetLeft+'px';
            this.divOutter.style.top =   this.dom.offsetTop+'px';
            
            
            this.dom.style.visibility='hidden';
            this.dom.parentNode.appendChild(this.divOutter);
            this._appendChild();
       }
       
       _init.prototype._appendChild = function(){
           
           this.open=false // 下拉状态，默认不下拉
           
           this.divOutter.innerHTML=ds_contTpl+ds_listTpl;
           
           this.ds_title = this.divOutter.getElementsByClassName('ds_title')[0];
           
           this.ds_cont = this.divOutter.getElementsByClassName('ds_cont')[0];
           
           this.ds_title.innerHTML = this.dom.options[this.dom.options.selectedIndex].innerHTML;
           
           this.ds_button = this.divOutter.getElementsByClassName('ds_button')[0];
           
           this.ds_list = this.divOutter.getElementsByClassName('ds_list')[0];
           
           this.dsl_cont = this.divOutter.getElementsByClassName('dsl_cont')[0];
           
           var oFragment = document.createDocumentFragment();
           
           for (var i =0;i<this.dom.options.length;i++){
               var p = document.createElement("p")
               
               p.setAttribute('index',i);
               
               p.innerHTML=this.dom.options[i].innerHTML;      
               
               oFragment.appendChild(p)
           }          
            this.dsl_cont.appendChild(oFragment)
       }
       
       
       _init.prototype._bindEvent = function(){
           var that = this;
           this.ds_cont.addEventListener('touchstart',function(e){pullDown(e,that)})
           this.dsl_cont.addEventListener('touchstart',function(e){select(e,that)})
       }
       
       function pullDown(e,that){
           that.open = !that.open
           if(that.open){
              that.ds_list.style.display='block' 
           }else{
              that.ds_list.style.display='none' 
           }       
       }
       
       function select(e,that){
          var index = e.target.getAttribute('index');
          if(!index){
              return;
          }
          that.dom.options[index].selected=true;
          that.ds_title.innerHTML = e.target.innerHTML;
          pullDown(e,that);
       }
       
       
       return new _init(dom,args);
    }
    return divselect;
})

