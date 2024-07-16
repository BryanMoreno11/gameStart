import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-authenticate-qr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authenticate-qr.component.html',
  styleUrl: './authenticate-qr.component.css'
})
export class AuthenticateQrComponent implements OnInit {
  qrCodeImage: string |  null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.generateQRCode().subscribe(
      data => {
        this.qrCodeImage = data.qrCode;
      },
      error=>{
        console.error('Error al generar el código QR:', error);
      }
    )
  }
}
