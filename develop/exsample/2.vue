<template>
    <div>
      <Button  @click='ajaxss'>2.vue</Button>
      <Button  @click='nigger'>nigger</Button>
      <h1>ajax result: {{val}} </h1>
      <h1>nigger result: {{val2}} </h1>
      <asdf />
      <input type='file' multiple="multiple" id="filea" />
    </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      val: '000',
      val2: '111'
    };
  },
  components: {
    asdf: {
      data: () => {
        return {
          name: 'kendra lust'
        }
      },
      template: '<h2>nice to meetting you :: {{name}}</h2>'
    },
  },
  computed: {},
  methods: {
    ajaxss() {
      axios.get('/api/hello').then(val => {
        let { data } = val;
        this.val = data;
      })
    },
    nigger() {
      axios.post('/api/nigger', { name: 'washington' }).then(val => {
        let { data } = val;
        this.val2 = data;
      })
    }
  },
  beforeDestroy() { },
  mounted() {
    const makeUploader = files => {
      let form = new FormData();
      Array.from(files).forEach((item, index) => {
        let filename = item.name.split(".")[0];
        let filelast = item.name.split(".")[1];
        form.append(`file-${index + 1}`, item, filename + '-' + new Date().valueOf() + "." + filelast);
      })
      return form;
    }
    let filea = document.getElementById("filea");
    filea.addEventListener('change', event => {
      let files = event.target.files;
      console.log(typeof files, [...files]);
      let list = [...files];
      list = Array.from(files);
      // console.log(makeUploader(list));
      axios.post("/api/uploadify", makeUploader(files), {
        headers: {
          // contentTypeaaa: 'fuckyou',
          // processData: false,
          // contentType: false,
        }
      }).then(val => {
        console.log(val);
      })
    }, false)
  }
}
</script>

<style scoped lang="less">
</style>
