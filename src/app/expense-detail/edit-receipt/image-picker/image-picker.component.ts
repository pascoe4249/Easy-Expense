import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CameraResultType, CameraSource, Capacitor, Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  @Input() selectedImage: string;
  @Output() imagePicked = new EventEmitter<string>();
  @Output() imageTaken = new EventEmitter<Date>();

  constructor(
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.alertCtrl.create({
        header: 'Error!',
        message: 'The camera could not be used at this time. Make sure permissions are granted.',
        buttons: [
            {
              text: 'Okay',
              role: 'cancel'
            },
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Camera,
      correctOrientation: true,
      width: 600,
      resultType: CameraResultType.Base64,
    }).then(image => {
      this.selectedImage = 'data:image/jpeg;base64,' + image.base64String;
      this.imagePicked.emit(this.selectedImage);
      let date = new Date();
      this.imageTaken.emit(date);
    }).catch(error => {
      this.alertCtrl.create({
        header: 'Error!',
        message: 'An unknown error occurred. Please try again.',
        buttons: [
            {
              text: 'Okay',
              role: 'cancel'
            },
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
    });
  }

}
