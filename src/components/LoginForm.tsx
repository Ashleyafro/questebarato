
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Here you would normally authenticate with your backend
      console.log('Login attempted with:', { email, password });
      
      if (email && password) {
        toast.success('Inicio de sesión exitoso');
        // Redirect or update state here
      } else {
        toast.error('Por favor complete todos los campos');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-zinc-800 border-zinc-700">
      <CardHeader>
        <CardTitle className="text-white text-xl">Iniciar sesión</CardTitle>
        <CardDescription className="text-gray-400">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-700 border-zinc-600 text-white"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-700 border-zinc-600 text-white"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-purple-700 hover:bg-purple-800 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-zinc-700 text-sm text-gray-400 pt-4">
        <p>¿No tienes una cuenta? <Button variant="link" className="p-0 h-auto text-purple-400">Registrarse</Button></p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
