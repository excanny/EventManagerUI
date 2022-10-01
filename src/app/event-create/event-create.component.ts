import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  createEventForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    startdate: [new Date().toISOString()],
    enddate: [new Date().toISOString()],
});

  constructor(private formBuilder: FormBuilder, private eventService: EventService, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
      //console.warn(this.createEventForm.value);
      this.eventService.createEvent(this.createEventForm.value).subscribe((data: {}) => {
       
        this.router.navigate(['/']);
        
      });
  }

}
