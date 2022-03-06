import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

// All Gets
  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(
      'https://blogpessoalbruno.herokuapp.com/postagens',
      this.token
    );
  }

  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(
      `https://blogpessoalbruno.herokuapp.com/postagens/${id}`,
      this.token
    );
  }

  getByTituloPostagem(titulo: string):Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://blogpessoalbruno.herokuapp.com/postagens/titulo/${titulo}`, this.token)
  }

// Post
  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(
      'https://blogpessoalbruno.herokuapp.com/postagens',
      postagem,
      this.token
    );
  }

// Put
  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>(
      'https://blogpessoalbruno.herokuapp.com/postagens',
      postagem,
      this.token
    );
  }

// Delete
  deletePostagem(id: number) {
    return this.http.delete(
      `https://blogpessoalbruno.herokuapp.com/postagens/${id}`,
      this.token
    );
  }
}
