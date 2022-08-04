<script setup lang="ts">
//     function reload(){
//       var container = document.getElementById("thematic");
//       var content = container.innerHTML;
//       container.innerHTML= content; 
      
//      //this line is to watch the result in console , you can remove it later	
//       console.log("Refreshed"); 
//   }

//   function img_reload_theme() {

//     reload()
//     // $( "#thematic" ).load(window.location.href + " #thematic" );
//     //  document.getElementById('thematic').innerHTML = location.reload();
//   }
    //     img_reload_theme();
    
    //     // document.getElementsByName("img").forEach.apply();
    //     // document.getElementById("img").contentWindow.location.reload(true);
    //     // document.getElementById("youriframeid").contentWindow.location.reload(true);
    //     //  var container = document.getElementById("thematic").contains.
    //     //  var container = document.getElementById("thematic");
    //     // var content = container.innerHTML;
    //     //   container.innerHTML= ""; 
    //     //   container.innerHTML= content; 
          
    //      //this line is to watch the result in console , you can remove it later	
    //       console.log("Refreshed"); 
        

  function setTheme(theme) {
    document.documentElement.className = theme;
    window.location.reload();
 }




  function get_images_by_theme(image: string, theme: string) {
  
    console.log(document.documentElement.className);
    console.log("src/components/icons/" + image + '_' + document.documentElement.className + ".png");
    return "src/components/icons/" + image + '_' + document.documentElement.className + ".png";
    
  }

  // function get_images_by_theme(image: string, theme: string) {
  
  //   // console.log(document.getElementsByClassName("root"));
  //   // console.log(localStorage.getItem("root"));
  //   // console.log(document.documentElement.style.getPropertyValue());
  //   console.log(document.documentElement.className);
  //   // console.log("src/components/icons/" + image + '_' + theme + ".png");
  //   return "src/components/icons/" + image + '_' + theme + ".png";
    
  // }


</script>


<template>
  <div>
      <button @click="setTheme('green')" title="Light mode">
        THEME GREEN
      </button>
      <button @click="setTheme('blue')" title="Dark mode">
        THEME BLUE
      </button>
      <button @click="setTheme('yellow')" title="Dark mode">
        THEME YELLOW
      </button>
	</div>

  <img :src="get_images_by_theme('WhiskeyRose')" />
  <!-- <img :src='src/components/icons/WhiskeyRose_{{document.documentElement.className}}.png' /> -->
  <!-- <img :[src]="src/components/icons/WhiskeyRose_" + document.documentElement.className + ".png" /> -->
</template>
