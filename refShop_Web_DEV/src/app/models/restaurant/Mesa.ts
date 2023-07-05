
export interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  estado: string;
  creadoEl: Date;
  creadoPor: number;
  modificadoEl: Date;
  modificadoPor: number;
  idUsuario: number;
  idMozo: number;
  creador: string;
  modificador: string;
  mozoEncargado: string;

}

export interface AddMesa {
  id: number | null;
  numero: number | null;
  capacidad: number | null;
  estado: string | null;
  creadoEl: Date | null;
  creadoPor: number | null;
  modificadoEl: Date | null;
  modificadoPor: number | null;
  idUsuario: number | null;
  idMozo: number | null;
  creador: string | null;
  modificador: string | null;
  mozoEncargado: string | null;

}

