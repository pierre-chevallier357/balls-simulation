import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BalleDetailsComponent } from "./balle-details/balle-details.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, BalleDetailsComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
