<template>
  <div class="recognition">
    <div v-if="!uploadImage">
      <h2>Select an image.</h2>
      <input @change="selectedImage" type="file" name="file">
    </div>
    <div v-else>
      <img v-show="uploadImage" :src="uploadImage"/>
      <br />
      <button @click="removeImage">Remove image</button>
    </div>
    <br />
    <button @click="upload" type="submit">Upload Photo</button>
  </div>
</template>

<script>
// import axios from 'axios'
import AWS from 'aws-sdk'

export default {
  name: 'recognition',
  props: {
  },
  data () {
    return {
      uploadImage: null
    }
  },
  methods: {
    selectedImage: function (e) {
      // 選択された File の情報を保存しておく
      e.preventDefault()
      let files = e.target.files
      let reader = new FileReader()
      reader.onload = (e) => {
        this.uploadImage = e.target.result
      }
      reader.readAsDataURL(files[0])
    },
    removeImage: function (e) {
      this.uploadImage = ''
    },
    upload: function (e) {
      var s3 = function () {
        AWS.config.region = 'us-east-1'
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'us-east-1:b272eb75-97a4-4f3d-8046-5d49d00ffbbe'
        })
        AWS.config.credentials.get(function (err) {
          if (!err) {
            console.log('Cognito Identity ID: ' + AWS.config.credentials.identityId)
          }
        })
        return new AWS.S3({params: {Bucket: 'vue-sample-apps-upload-photos'}})
      }
      let file = this.uploadImage
      let timestamp = new Date().getTime()
      let filename = timestamp + '.png'
      var params = {
        Key: filename,
        // ContentType: file.type,
        Body: file,
        ACL: 'public-read'
      }
      // console.log(params)
      // console.log(s3())
      s3().putObject(params, function (err, data) {
        if (err) console.log(err, err.stack) // an error occurred
        else console.log(data) // successful response
      })

      // console.log(file)
      // var file = $('#upload-file').prop('files')[0]
      // var timestamp = new Date().getTime()
      // var filename = 'file' + timestamp + '.jpg'
      // s3().putObject({Key: filename, ContentType: file.type, Body: file, ACL: 'public-read'},
      //   function (err, data) {
      //     // if failed, alert
      //     if(data !== null){
      //       alert('アップロード成功!')
      //     } else {
      //       alert('アップロード失敗.')
      //     }
      //   })
      // var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'})
      // axios
      //   .post('url', formData, config)
      //   .then(function (responce) {
      //     // responce
      //   })
    }
  }
}
</script>

<style scoped>

</style>
