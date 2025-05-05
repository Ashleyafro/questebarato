
import React, { useState } from 'react';
import { User, Settings, LogOut, CreditCard, History, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const UserAccount = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      paymentMethod: 'card'
    }
  });
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handlePaymentMethodChange = () => {
    toast({
      title: "Método de pago actualizado",
      description: "Tu método de pago preferido ha sido actualizado",
    });
  };

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#27AE60] rounded-full p-4">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Mi cuenta</h1>
            <p className="text-gray-300">usuario@ejemplo.com</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeSection === 'payments' ? 'bg-zinc-700 text-white' : 'text-white hover:bg-zinc-700 hover:text-white'}`}
            onClick={() => toggleSection('payments')}
          >
            <CreditCard className="mr-3" size={20} />
            Métodos de pago
          </Button>
          
          <Collapsible open={activeSection === 'payments'} className="space-y-4">
            <CollapsibleContent className="bg-zinc-800 rounded-lg p-4 space-y-4">
              <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(handlePaymentMethodChange)}>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="grid grid-cols-1 gap-4"
                        >
                          <FormItem className="flex items-center justify-between space-x-2 space-y-0 bg-zinc-700 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="card" id="card" className="text-[#27AE60]" />
                              </FormControl>
                              <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-2 rounded-md">
                                  <CreditCard size={24} className="text-white" />
                                </div>
                                <FormLabel className="font-medium text-white cursor-pointer">Tarjeta bancaria</FormLabel>
                              </div>
                            </div>
                            {field.value === 'card' && <Check className="h-5 w-5 text-[#27AE60]" />}
                          </FormItem>
                          
                          <FormItem className="flex items-center justify-between space-x-2 space-y-0 bg-zinc-700 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="bizum" id="bizum" className="text-[#27AE60]" />
                              </FormControl>
                              <div className="flex items-center gap-3">
                                <div className="bg-blue-500/20 p-2 rounded-md">
                                  <span className="font-bold text-blue-500 text-lg">B</span>
                                </div>
                                <FormLabel className="font-medium text-white cursor-pointer">Bizum</FormLabel>
                              </div>
                            </div>
                            {field.value === 'bizum' && <Check className="h-5 w-5 text-[#27AE60]" />}
                          </FormItem>
                          
                          <FormItem className="flex items-center justify-between space-x-2 space-y-0 bg-zinc-700 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="paypal" id="paypal" className="text-[#27AE60]" />
                              </FormControl>
                              <div className="flex items-center gap-3">
                                <div className="bg-blue-600/20 p-2 rounded-md flex items-center justify-center">
                                  <span className="font-bold text-blue-400 text-lg">P</span>
                                </div>
                                <FormLabel className="font-medium text-white cursor-pointer">PayPal</FormLabel>
                              </div>
                            </div>
                            {field.value === 'paypal' && <Check className="h-5 w-5 text-[#27AE60]" />}
                          </FormItem>
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#27AE60] hover:bg-[#219653] text-white border-none"
                  >
                    Guardar cambios
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-dashed border-zinc-600 bg-transparent hover:bg-zinc-700 text-gray-300"
                  >
                    <Plus size={16} className="mr-2" /> Añadir nuevo método de pago
                  </Button>
                </form>
              </Form>
            </CollapsibleContent>
          </Collapsible>
          
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-700 hover:text-white">
            <History className="mr-3" size={20} />
            Historial de compras
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-700 hover:text-white">
            <Settings className="mr-3" size={20} />
            Configuración
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-zinc-700 hover:text-red-300">
            <LogOut className="mr-3" size={20} />
            Cerrar sesión
          </Button>
        </div>
      </div>
      
      <div className="bg-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Preferencias</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white">Notificaciones</h3>
              <p className="text-sm text-gray-400">Recibir alertas sobre ofertas y descuentos</p>
            </div>
            <Button variant="outline" className="bg-[#27AE60] hover:bg-[#219653] text-white border-none">
              Activadas
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white">Supermercados favoritos</h3>
              <p className="text-sm text-gray-400">Personaliza tus supermercados preferidos</p>
            </div>
            <Button variant="outline" className="bg-zinc-700 hover:bg-zinc-600 text-white border-zinc-600">
              Configurar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
