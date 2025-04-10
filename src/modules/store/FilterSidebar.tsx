export default function FilterSidebar() {
    const especialidades = [
      'Administración y gestión', 'Anestesiología y dolor', 'Cardiología', 'Dermatología',
      'Diabetes', 'Emergentología', 'Endocrinología', 'Gastroenterología',
      'Geriatría', 'Ginecología', 'Hematología', 'Infectología', 'Medicina familiar',
      'Medicina general', 'Medicina intensiva', 'Medicina laboral', 'Nefrología',
      'Nutrición', 'Oftalmología', 'Oncología', 'Pediatría', 'Psiquiatría',
      'Radiología e imagenología', 'Traumatología', 'Urología'
    ];
  
    return (
      <aside className="w-1/4 hidden lg:block space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="font-semibold mb-2">Especialidades</h2>
          <ul className="space-y-1 max-h-[700px] overflow-auto pr-1">
            {especialidades.map((esp) => (
              <li key={esp}>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> <span>{esp}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="font-semibold mb-2">Recurso</h2>
          <label className="block"><input type="checkbox" /> Curso</label>
          <label className="block"><input type="checkbox" /> Guías profesionales</label>
        </div>
  
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="font-semibold mb-2">Profesión</h2>
          <label className="block"><input type="checkbox" /> Personal médico</label>
          <label className="block"><input type="checkbox" /> Personal de enfermería y auxiliares</label>
          <label className="block"><input type="checkbox" /> Otra profesión</label>
        </div>
  
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="font-semibold mb-2">Duración</h2>
          <label className="block"><input type="checkbox" /> Hasta 300 horas</label>
          <label className="block"><input type="checkbox" /> De 100 a 300 horas</label>
          <label className="block"><input type="checkbox" /> Más de 300 horas</label>
        </div>
      </aside>
    );
  }
  