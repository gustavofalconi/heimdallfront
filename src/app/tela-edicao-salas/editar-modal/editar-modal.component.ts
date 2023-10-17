import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rooms } from 'src/app/models/rooms.model';
import { GetRoomsService } from 'src/app/services/get-rooms.service';

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.scss'],
})
export class EditarModalComponent implements OnInit {
  sala: Rooms;
  teachers: any[] = [];
  schedules: any[] = [];
  disableSelect = new FormControl(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarModalComponent>,
    private roomsService: GetRoomsService
  ) {
    this.sala = { ...data }; // Copie os dados da sala para editar
  }
  ngOnInit(): void {
    this.teachers = this.roomsService.teachers;
    this.schedules = this.roomsService.schedules;
  }

  public atualiza(e: MatOptionSelectionChange, type: string) {
    if (type == 'horario') {
      this.sala.schedule = e.source.value;
      return;
    }
    this.sala.teacher = e.source.value;
  }

  editarSala() {
    if (
      this.sala.description.trim() !== '' &&
      this.sala.name.trim() !== '' &&
      this.sala.seats > 0 &&
      this.sala.teacher.trim() !== '' &&
      this.sala.schedule.trim() !== ''
    ) {
      const index = this.roomsService.rooms.indexOf(this.data);
      if (index !== -1) {
        this.roomsService.rooms[index] = this.sala;
      }
      this.dialogRef.close(this.sala);
    } else {
      return;
    }
  }
}
