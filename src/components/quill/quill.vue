<template>
    <div class="edit_container">
        <!-- 图片上传组件辅助-->
        <el-upload
        class="avatar-uploader"
        :action="serverUrl"
        name="img"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload">
        </el-upload>
        <quill-editor 
        class="editor lhnormal"
        v-model="content"
        ref="myQuillEditor" 
        :options="editorOption" 
        @blur="onEditorBlur($event)" 
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import * as Quill from 'quill'  //引入编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import https from '@/config/apiConfig'

//quill编辑器的字体
let fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];  
let Font = Quill.import('formats/font')
Font.whitelist = fonts //将字体加入到白名单 
Quill.register(Font, true)
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: fonts }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
];

export default {
    components: {
        quillEditor
    },
    props:['quilldata'],
    data() {
        return {
            content: this.quilldata,
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            // quill配置项
            editorOption: {
                placeholder: "",
                theme: "snow", // or 'bubble'
                placeholder: "您想说点什么？",
                modules: {
                  toolbar: {
                    container: toolbarOptions,
                    // container: "#toolbar",
                    handlers: {
                      image: function(value) {
                        if (value) {
                          // 触发input框选择图片文件
                          document.querySelector(".avatar-uploader input").click();
                        } else {
                          this.quill.format("image", false);
                        }
                      },
                      // link: function(value) {
                      //   if (value) {
                      //     var href = prompt('请输入url');
                      //     this.quill.format("link", href);
                      //   } else {
                      //     this.quill.format("link", false);
                      //   }
                      // },
                    }
                  }
                }
            },
            serverUrl:'http://oauth.jinaup.com/api/open/topic/info/addHtmlImg', // 这里写你要上传的图片服务器地址
            // 上传图片请求头
            header:{}
        }
    },
    created(){

    },
    methods: {
        onEditorBlur() {
          //失去焦点事件
        },
        onEditorFocus() {
          //获得焦点事件
        },
        onEditorChange() {
          //内容改变事件
          this.$emit("input", this.content);
        },
        // 富文本图片上传前
        beforeUpload() {
          // 显示loading动画
          this.quillUpdateImg = true;
        },
        uploadSuccess(res, file) {
          console.log('图片上传成功')
          // res为图片服务器返回的数据
          // 获取富文本组件实例
          let quill = this.$refs.myQuillEditor.quill;
          // 如果上传成功
          if (res.res_code == 1) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片  res.url为服务器返回的图片地址
            quill.insertEmbed(length, "image", res.result);
            // 调整光标到最后
            quill.setSelection(length + 1);
          } else {
            this.$message.error("图片插入失败");
          }
          // loading动画消失
          this.quillUpdateImg = false;
        },
        // 富文本图片上传失败
        uploadError() {
          // loading动画消失
          this.quillUpdateImg = false;
          this.$message.error("图片插入失败");
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }
}
</script>

<style type="text/css">
.edit_container{
    width: 100%;
}
.ql-container {
    height: 400px !important;
}
.avatar-uploader{
    display: none;
}
.lhnormal{
    line-height: normal;
}
/*字体汉化*/
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
    content: "宋体";
    font-family: "SimSun";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
    content: "黑体";
    font-family: "SimHei";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
    content: "微软雅黑";
    font-family: "Microsoft YaHei";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
    content: "楷体";
    font-family: "KaiTi";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
    content: "仿宋";
    font-family: "FangSong";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
    content: "Arial";
    font-family: "Arial";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
    content: "Times New Roman";
    font-family: "Times New Roman";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
    content: "sans-serif";
    font-family: "sans-serif";
}
 
.ql-font-SimSun {
    font-family: "SimSun";
}
.ql-font-SimHei {
    font-family: "SimHei";
}
.ql-font-Microsoft-YaHei {
    font-family: "Microsoft YaHei";
}
.ql-font-KaiTi {
    font-family: "KaiTi";
}
.ql-font-FangSong {
    font-family: "FangSong";
}
.ql-font-Arial {
    font-family: "Arial";
}
.ql-font-Times-New-Roman {
    font-family: "Times New Roman";
}
.ql-font-sans-serif {
    font-family: "sans-serif";
}
</style>