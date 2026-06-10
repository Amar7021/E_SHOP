import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useRouteError, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function RouteError() {
    const error = useRouteError();
    const navigate = useNavigate();

    const errorMessage =
        error?.message ||
        error?.statusText ||
        "Something unexpected happened.";

    return (
        <div className="flex min-h-[100vh] items-center justify-center bg-background p-4">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader className="items-center text-center">
                    <div className="mb-4 p-4 flex items-center justify-center">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                    </div>

                    <CardTitle className="text-3xl">
                        Something went wrong
                    </CardTitle>

                    <CardDescription>
                        An unexpected error occurred while loading this page.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="rounded-lg border bg-muted/40 p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                            Error Details
                        </p>

                        <p className="mt-2 break-words text-sm">
                            {errorMessage}
                        </p>
                    </div>

                    {import.meta.env.DEV && error?.stack && (
                        <details className="rounded-lg border p-4">
                            <summary className="cursor-pointer text-sm font-medium">
                                Stack Trace
                            </summary>

                            <pre className="mt-3 overflow-auto text-xs whitespace-pre-wrap">
                                {error.stack}
                            </pre>
                        </details>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            className="flex-1"
                            onClick={() => window.location.reload()}
                        >
                            <RefreshCw />
                            Reload Page
                        </Button>

                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate("/")}
                        >
                            <Home />
                            Go Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}