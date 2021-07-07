import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LevelEditorComponent } from './level-editor/level-editor.component';
import { PlayingArenaComponent } from './playing-arena/playing-arena.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';
import { EditorArenaComponent } from './editor-arena/editor-arena.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LevelEditorComponent,
    PlayingArenaComponent,
    EditorToolbarComponent,
    EditorArenaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DragDropModule,
    RouterModule.forRoot([
    { path: '', component: PlayingArenaComponent, pathMatch: 'full' },
    { path: 'editor', component: LevelEditorComponent }
], { relativeLinkResolution: 'legacy' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
