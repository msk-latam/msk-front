import React from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Label from "components/Label/Label";
import Button from "components/Button/Button";

const DashboardBillingAddress = () => {
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block">
          <Label>País</Label>
          <Select className="mt-1">
            <option>Argentina</option>
            <option>México</option>
            <option>Chile</option>
            <option>España</option>
          </Select>
        </label>
        <label className="block">
          <Label>Provincia o estado</Label>
          <Input
            type="text"
            className="mt-1"
            placeholder="Ingresar provincia o estado"
          />
          {/* <Select className="mt-1">
            <option value="ha'apai">Ha'apai</option>
            <option value="tongatapu">Tongatapu</option>
            <option value="vava'u">Vava'u</option>
          </Select> */}
        </label>
        <label className="block  md:col-span-2">
          <Label>Dirección</Label>

          <Input
            type="text"
            className="mt-1"
            placeholder="Ingresar dirección"
          />
        </label>
        <label className="block">
          <Label>E-mail</Label>
          <Input type="email" placeholder="Ingresar e-mail" className="mt-1" />
        </label>
        <label className="block">
          <Label>Código postal</Label>
          <Input
            type="text"
            className="mt-1"
            placeholder="Ingresar código postal"
          />
        </label>
        <Button
          className="md:col-span-2 bg-neutral-200 text-neutral-500"
          type="submit"
        >
          Guardar cambios
        </Button>
      </form>
    </div>
  );
};

export default DashboardBillingAddress;
