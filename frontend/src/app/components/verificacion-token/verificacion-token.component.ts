import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-verificacion-token',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verificacion-token.component.html',
  styleUrl: './verificacion-token.component.css'
})
export class VerificacionTokenComponent {
  authToken: string = '';
  secret: string = 'I>n9IRubeqrIK0B>QZhT,@B.x7C2^N!i';
  verificationResult: boolean | null = null;

  constructor(private authService: AuthService) { }

  verify(): void {
    this.authService.verifyToken(this.authToken, this.secret).subscribe(
      response => {
        this.verificationResult = response.verified;
      },
      error => {
        console.error('Error en la verificación del token:', error);
        this.verificationResult = false;
      }
    );
  }

}
