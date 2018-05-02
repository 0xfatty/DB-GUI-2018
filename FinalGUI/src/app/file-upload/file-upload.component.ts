import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../_services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {

  }

  readURL(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        //console.log(e.target);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  handleFileInput(files: FileList) {
    console.log('handleFileInput');
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.srcElement);
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      console.log('success');
    }, error => {
      console.log(error);
    });
  }
}
