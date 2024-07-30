import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from 'ngx-quill';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/IPost.interface';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-post-dialog',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatDialogContent,
    QuillModule,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss'
})
export class PostDialogComponent implements OnInit{

  formBuilder:FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  authService:AuthService = inject(AuthService);
  readonly dialogRef = inject(MatDialogRef<PostDialogComponent>);

  formPost!:FormGroup;
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ size: [] }],
        [{ header: [] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'],
      ],
    },
  };


  ngOnInit(): void {
    this.formPost =this.formBuilder.group({
      title:["",Validators.required],
      content:["",Validators.required]
    })
  }

  activateRTL(editor: any) {
    editor.format('align', 'right');
    editor.format('direction', 'rtl');
  }

  savePost(){
      if(this.formPost.invalid){
          return;
      }
      let post:Post = {} as Post;
      post.title = this.formPost.controls["title"].value;
      post.content = this.formPost.controls["content"].value;
      post.userId = this.authService.userId;
      this.postService.addPost(post).subscribe();
      this.dialogRef.close();
  }

}
