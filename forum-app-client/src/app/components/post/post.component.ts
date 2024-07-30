import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { DatePipe } from '@angular/common';
import { PostService } from '../../services/post.service';
import { PostDTO } from '../../interface/IPost.interface';
import { CommentService } from '../../services/comment.service';
import { CommentDTO, Comment } from '../../interface/IComment.interface';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignalrService } from '../../services/signalr.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommentComponent,
    DatePipe,
    MatIcon,
    MatButton,
    QuillModule,
    ReactiveFormsModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  postService: PostService = inject(PostService);
  commentService: CommentService = inject(CommentService);
  signalRService: SignalrService = inject(SignalrService);
  authService:AuthService = inject(AuthService);

  @Input() post!: PostDTO;
  comment!: CommentDTO[];

  commentHtml!: FormControl;

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ size: [] }],
        [{ header: [] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
      ],
    },
  };

  ngOnInit(): void {
    this.commentHtml = new FormControl('', [Validators.required]);
  }

  activateRTL(editor: any) {
    editor.format('align', 'right');
    editor.format('direction', 'rtl');
  }

  addComment() {
    if (this.commentHtml.invalid) {
      return;
    }
    let comment: Comment = {} as Comment;
    comment.content = this.commentHtml.value;
    comment.userId =this.authService.userId;
    comment.postId = this.post.id;
    this.commentService.addComment(comment).subscribe();
    this.commentHtml.setValue('');
  }
}
