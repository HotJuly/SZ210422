import {ref,onMounted} from 'vue';
export default function(){
    const pageX= ref(-1);
    const pageY= ref(-1);

    onMounted(()=>{
      // console.log('onMounted')
      document.addEventListener('click',function(event){
        // console.log('click',event)
        const {clientX,clientY} = event;
        pageX.value=clientX;
        pageY.value=clientY;
      })
    })

    return {
        pageX,
        pageY
    }
}