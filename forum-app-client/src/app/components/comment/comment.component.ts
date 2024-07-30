import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentDTO } from '../../interface/IComment.interface';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe,MatIcon],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {

  private sanitizer: DomSanitizer = inject(DomSanitizer);
  content!:SafeHtml;
  ngOnInit(): void {
  this.content = this.sanitizer.bypassSecurityTrustHtml(this.comment.content);
  }

  @Input() comment!:CommentDTO;



}
